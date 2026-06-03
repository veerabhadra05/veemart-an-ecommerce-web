from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from bson.objectid import ObjectId
import razorpay
import hmac
import hashlib

app = Flask(__name__)
CORS(app)

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

razorpay_client = razorpay.Client(
    auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
)


try:
    client.admin.command('ping')
    print("MongoDB Connected Successfully")
except Exception as e:
    print("MongoDB Connection Error:", e)

db = client["veemart"]

users_collection = db["users"]
products_collection = db["products"]
categories_collection = db["categories"]
cart_collection = db["cart"]
orders_collection = db["orders"]

@app.route("/")
def Home():
    return {"message":"Flask server is running"}

@app.route("/categories", methods=["GET"])
def get_categories():

    categories = list(categories_collection.find())

    result = []

    for cat in categories:
        result.append({
            "id": str(cat["_id"]),
            "name": cat["name"],
            "image": cat["image"]
        })

    return jsonify(result)

@app.route("/register", methods=['POST'])
def register():

    data = request.json

    existing_user = users_collection.find_one({
        "email": data["email"]
    })

    if existing_user:
        return jsonify({"message": "User already exists"}), 400

    users_collection.insert_one({
        "name": data["name"],
        "email": data["email"],
        "password": data["password"],
        "role":"user"
    })

    return jsonify({"message": "User Registered Successfully"})

@app.route('/login', methods=['POST'])
def login():

    data = request.json

    user = users_collection.find_one({
        "email": data["email"],
        "password": data["password"],
    })

    if user:

        user["_id"] = str(user["_id"])

        return jsonify({
            "message": "Login Success",
            "user": user
        })

    return jsonify({
        "message": "Invalid Credentials"
    })

@app.route("/add-to-cart", methods=["POST"])
def add_to_cart():

    data = request.json

    user_id = data["user_id"]
    product_id = data["product_id"]
    quantity = data["quantity"]

    existing = cart_collection.find_one({
        "user_id": user_id,
        "product_id": product_id
    })

    if existing:

        cart_collection.update_one(
            {"_id": existing["_id"]},
            {
                "$set": {
                    "quantity": existing["quantity"] + quantity
                }
            }
        )

    else:

        cart_collection.insert_one({
            "user_id": user_id,
            "product_id": product_id,
            "quantity": quantity
        })

    return jsonify({
        "message": "Added to cart"
    })

@app.route("/cart/<user_id>", methods=["GET"])
def get_cart(user_id):

    cart_items = list(cart_collection.find({
        "user_id": user_id
    }))

    result = []

    for item in cart_items:

        product = products_collection.find_one({
            "_id": ObjectId(item["product_id"])
        })

        result.append({
            "id": str(item["_id"]),
            "quantity": item["quantity"],
            "name": product["name"],
            "price": product["price"],
            "image": product["image"]
        })

    return jsonify(result)

@app.route("/cart/<id>", methods=["DELETE"])
def remove_from_cart(id):

    cart_collection.delete_one({
        "_id": ObjectId(id)
    })

    return jsonify({
        "message": "Item removed successfully"
    })

# @app.route("/place-order", methods=["POST"])
# def place_order():

#     data = request.json

#     user_id = data["user_id"]

#     cart_items = list(cart_collection.find({
#         "user_id": user_id
#     }))

#     if not cart_items:
#         return jsonify({
#             "message": "Cart is empty"
#         })

#     order_items = []

#     for item in cart_items:

#         product = products_collection.find_one({
#             "_id": ObjectId(item["product_id"])
#         })

#         order_items.append({
#             "product_id": item["product_id"],
#             "name": product["name"],
#             "image": product["image"],
#             "price": product["price"],
#             "quantity": item["quantity"]
#         })

#     orders_collection.insert_one({
#         "user_id": user_id,
#         "status": "Pending",
#         "payment_status": "PENDING",
#         "items": order_items
#     })

#     cart_collection.delete_many({
#         "user_id": user_id
#     })

#     return jsonify({
#         "message": "Order placed successfully"
#     })

@app.route('/products', methods=['GET'])
def get_products():

    products = list(products_collection.find())

    result = []

    for product in products:

        result.append({
            "id": str(product["_id"]),
            "title": product["name"],
            "image": product["image"],
            "price": product["price"],
            "description": product["description"],
            "stock": product["stock"]
        })

    return jsonify(result)

@app.route('/products/<id>', methods=['GET'])
def get_product(id):

    product = products_collection.find_one({
        "_id": ObjectId(id)
    })

    if not product:
        return jsonify({"message": "Product not found"}), 404

    result = {
        "id": str(product["_id"]),
        "title": product["name"],
        "image": product["image"],
        "price": product["price"],
        "description": product["description"],
        "stock": product["stock"]
    }

    return jsonify(result)

@app.route("/orders/<user_id>", methods=["GET"])
def get_orders(user_id):

    orders = list(orders_collection.find({
        "user_id": user_id
    }))

    result = []

    for order in orders:

        result.append({
            "order_id": str(order["_id"]),
            "status": order["status"],
            "payment_status": order["payment_status"],
            "items": order["items"],
            "total_amount": order["total_amount"]
        })

    return jsonify(result)

#admin-routes

@app.route("/admin/add-product", methods=["POST"])
def add_product():

    data = request.json

    products_collection.insert_one({
        "name": data["name"],
        "image": data["image"],
        "price": data["price"],
        "description": data["description"],
        "stock": data["stock"],
        "category": data["category"]
    })

    return jsonify({
        "message": "Product added successfully"
    })


@app.route("/admin/product/<id>", methods=["DELETE"])
def delete_product(id):

    products_collection.delete_one({
        "_id": ObjectId(id)
    })

    return jsonify({
        "message": "Product deleted"
    })

@app.route("/admin/product/<id>", methods=["PUT"])
def update_product(id):

    data = request.json

    products_collection.update_one(
        {"_id": ObjectId(id)},
        {
            "$set": {
                "name": data["name"],
                "image": data["image"],
                "price": data["price"],
                "description": data["description"],
                "stock": data["stock"],
                "category": data["category"]
            }
        }
    )

    return jsonify({
        "message": "Product updated"
    })


@app.route("/admin/orders", methods=["GET"])
def get_all_orders():

    orders = list(orders_collection.find())

    result = []

    for order in orders:

        result.append({

            "_id": str(order["_id"]),

            "user_id": order["user_id"],

            "status": order["status"],

            "payment_status": order["payment_status"],

            "items": order["items"]

        })

    return jsonify(result)

@app.route("/admin/order-status/<id>", methods=["PUT"])
def update_order_status(id):

    data = request.json

    orders_collection.update_one(

        {"_id": ObjectId(id)},

        {
            "$set": {

                "status": data["status"]

            }
        }
    )

    return jsonify({
        "message": "Order Status Updated"
    })

@app.route("/admin/stats", methods=["GET"])
def admin_stats():

    products = products_collection.count_documents({})

    orders = orders_collection.count_documents({})

    users = users_collection.count_documents({})

    return jsonify({
        "products": products,
        "orders": orders,
        "users": users - 1
    })

#payments

@app.route("/verify-payment", methods=["POST"])
def verify_payment():

    data = request.json

    try:

        razorpay_client.utility.verify_payment_signature({
            "razorpay_order_id": data["razorpay_order_id"],
            "razorpay_payment_id": data["razorpay_payment_id"],
            "razorpay_signature": data["razorpay_signature"]
        })

        user_id = data["user_id"]

        cart_items = list(cart_collection.find({
            "user_id": user_id
        }))

        order_items = []
        total_amount = 0

        for item in cart_items:

            product = products_collection.find_one({
                "_id": ObjectId(item["product_id"])
            })

            subtotal = product["price"] * item["quantity"]

            total_amount += subtotal

            order_items.append({
                "product_id": item["product_id"],
                "name": product["name"],
                "image": product["image"],
                "price": product["price"],
                "quantity": item["quantity"]
            })

        orders_collection.insert_one({

            "user_id": user_id,

            "status": "Placed",

            "payment_status": "PAID",

            "total_amount": total_amount,

            "razorpay_order_id":
                data["razorpay_order_id"],

            "razorpay_payment_id":
                data["razorpay_payment_id"],

            "items": order_items
        })

        cart_collection.delete_many({
            "user_id": user_id
        })

        return jsonify({
            "success": True
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 400

@app.route("/create-razorpay-order", methods=["POST"])
def create_razorpay_order():

    data = request.json

    user_id = data["user_id"]

    cart_items = list(
    cart_collection.find({
        "user_id": user_id
    }))

    amount = 0

    for item in cart_items:

        product = products_collection.find_one({"_id": ObjectId(item["product_id"])})

        amount += (product["price"]* item["quantity"])

    order = razorpay_client.order.create({
        "amount": amount,
        "currency": "INR"
    })

    return jsonify(order)

if __name__ == "__main__":
    app.run(debug=True)