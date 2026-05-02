from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host='localhost',
    user="root",
    password="mydata",
    database="veemart"
)

cursor = db.cursor(dictionary=True)

@app.route("/")
def Home():
    return {"message":"Flask server is running"}

@app.route("/categories", methods=["GET"])
def get_categories():
    cursor.execute("SELECT id, name, image FROM categories")
    rows = cursor.fetchall()

    categories = []
    for row in rows:
        categories.append({
            "id": row['id'],
            "name": row['name'],
            "image": row['image']
        })

    return jsonify(categories)

@app.route("/register",methods=['POST'])
def register():
    data = request.json

    name = data['name']
    email = data['email']
    password = data['password']

    cursor.execute("SELECT * FROM USERS WHERE EMAIL=%s",(email,))

    if cursor.fetchone():
        return jsonify({"message":"User already exists"}),400
    cursor.execute(
        "INSERT INTO USERS(name,email,password) VALUES (%s,%s,%s)",(name,email,password)
    )
    db.commit()

    return jsonify({"message":"User Registered Successfully"})

@app.route('/login',methods=['POST'])
def login():
    data = request.json

    email = data['email']
    password = data['password']

    cursor.execute(
        "SELECT * FROM USERS WHERE email = %s AND password = %s",(email,password)
    )
    user = cursor.fetchone()

    if user:
        return jsonify({"message":"Login Success","user":user})
    else:
        return jsonify({"message":"Invalid Credentials"})

@app.route("/add-to-cart", methods=["POST"])
def add_to_cart():
    data = request.json

    user_id = data['user_id']
    product_id = data['product_id']
    quantity = data['quantity']

    cursor.execute(
        "SELECT * FROM cart WHERE user_id=%s AND product_id=%s",
        (user_id, product_id)
    )
    existing = cursor.fetchone()

    if existing:
        cursor.execute(
            "UPDATE cart SET quantity = quantity + %s WHERE id=%s",
            (quantity, existing['ID'])   # ✅ FIX HERE
        )
    else:
        cursor.execute(
            "INSERT INTO cart (user_id, product_id, quantity) VALUES (%s, %s, %s)",
            (user_id, product_id, quantity)
        )

    db.commit()
    return jsonify({"message": "Added to cart"})

@app.route("/cart/<int:user_id>", methods=["GET"])
def get_cart(user_id):
   
    cursor.execute("""
        SELECT c.id, c.quantity, p.name, p.price, p.image
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = %s
    """, (user_id,))

    data = cursor.fetchall()
    return jsonify(data)

@app.route("/cart/<int:id>", methods=["DELETE"])
def remove_from_cart(id):
    try:
        cursor.execute("SELECT * FROM cart WHERE id=%s", (id,))
        item = cursor.fetchone()

        if not item:
            return jsonify({"message": "Item not found"}), 404

        cursor.execute("DELETE FROM cart WHERE id=%s", (id,))
        db.commit()

        return jsonify({"message": "Item removed successfully"})
    
    except Exception as e:
        print("ERROR:", e)
        return jsonify({"message": "Server error"}), 500

@app.route("/place-order", methods=["POST"])
def place_order():
    data = request.json
    user_id = data['user_id']

    # 1. Create order
    cursor.execute(
        "INSERT INTO orders (user_id, status, payment_status) VALUES (%s, %s, %s)",
        (user_id, "Pending", "PENDING")
    )
    db.commit()

    order_id = cursor.lastrowid

    # 2. Get cart items
    cursor.execute("SELECT * FROM cart WHERE user_id=%s", (user_id,))
    cart_items = cursor.fetchall()

    # 3. Insert into order_items
    for item in cart_items:
        cursor.execute("SELECT price FROM products WHERE id=%s", (item['product_id'],))
        price = cursor.fetchone()['price']

        cursor.execute("""
            INSERT INTO order_items (order_id, product_id, quantity, price)
            VALUES (%s, %s, %s, %s)
        """, (order_id, item['product_id'], item['quantity'], price))

    # 4. Clear cart
    cursor.execute("DELETE FROM cart WHERE user_id=%s", (user_id,))
    db.commit()

    return jsonify({"message": "Order placed successfully"})

@app.route('/products', methods=['GET'])
def get_products():
    cursor.execute("SELECT id, name, image, price,description,stock FROM products")
    rows = cursor.fetchall()

    products = []
    for row in rows:
        products.append({
        "id": row['id'],
        "title": row['name'],
        "image": row['image'],
        "price": float(row['price']),
        "description": row['description'],
        "stock": row['stock']
        })


    return jsonify(products)

@app.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    cursor.execute("SELECT id, name, image, price,description,stock FROM products WHERE id=%s", (id,))
    row = cursor.fetchone()
    product = {
    "id": row['id'],
    "title": row['name'],
    "image": row['image'],
    "price": row['price'],
    "description": row['description'],
    "stock": row['stock']
}


    return jsonify(product)

@app.route("/orders/<int:user_id>", methods=["GET"])
def get_orders(user_id):
    cursor.execute("""
        SELECT 
            o.id AS order_id,
            o.status,
            o.payment_status,
            o.created_at,

            oi.product_id,
            oi.quantity,
            oi.price,

            p.name,
            p.image

        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        WHERE o.user_id = %s
        ORDER BY o.id DESC
    """, (user_id,))

    rows = cursor.fetchall()

    if not rows:
        return jsonify([])

    orders = {}

    for row in rows:
        oid = row['order_id']

        if oid not in orders:
            orders[oid] = {
                "order_id": oid,
                "status": row['status'],
                "payment_status": row['payment_status'],
                "created_at": str(row['created_at']),  # ✅ fix datetime
                "items": []
            }

        orders[oid]["items"].append({
            "product_id": row['product_id'],
            "name": row['name'],
            "image": row['image'],
            "price": float(row['price']),
            "quantity": row['quantity']
        })

    return jsonify(list(orders.values()))

if __name__ == "__main__":
    app.run(debug=True)