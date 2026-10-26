#include <bits/stdc++.h>
using namespace std;

// ==========================================
// Model 1: Product
// ==========================================
class Product {
public:
    int id;
    string name;
    string category;
    double price;
    int stock;

    Product() {
        this->id = 0;
        this->name = "";
        this->category = "";
        this->price = 0.0;
        this->stock = 0;
    }

    Product(int id, string name, string category, double price, int stock) {
        this->id = id;
        this->name = name;
        this->category = category;
        this->price = price;
        this->stock = stock;
    }

    void display() {
        cout << "ID: " << id 
             << " | " << name 
             << " [" << category << "]" 
             << " - $" << price 
             << " | In Stock: " << stock << endl;
    }
};

// ==========================================
// Model 2: CartItem (Product with selected quantity)
// ==========================================
class CartItem {
public:
    Product product;
    int quantity;

    CartItem(Product product, int quantity) {
        this->product = product;
        this->quantity = quantity;
    }

    double getTotalPrice() {
        return product.price * quantity;
    }

    void display() {
        cout << product.id << ". " << product.name 
             << " | Qty: " << quantity 
             << " | Price: $" << product.price 
             << " | Subtotal: $" << getTotalPrice() << endl;
    }
};

// ==========================================
// Model 3: Cart
// ==========================================
class Cart {
public:
    vector<CartItem> items;

    // Add item to cart or update quantity if already present
    void addItem(Product p, int qty) {
        for (int i = 0; i < (int)items.size(); i++) {
            if (items[i].product.id == p.id) {
                items[i].quantity += qty;
                cout << "\nUpdated quantity for " << p.name << " in cart!" << endl;
                return;
            }
        }
        CartItem newItem(p, qty);
        items.push_back(newItem);
        cout << "\nAdded " << p.name << " (x" << qty << ") to your cart!" << endl;
    }

    // Remove item from cart by product ID
    void removeItem(int productId) {
        for (int i = 0; i < (int)items.size(); i++) {
            if (items[i].product.id == productId) {
                cout << "\n" << items[i].product.name << " removed from your cart." << endl;
                items.erase(items.begin() + i);
                return;
            }
        }
        cout << "\nItem with ID " << productId << " not found in your cart!" << endl;
    }

    // Calculate total bill for cart
    double calculateTotal() {
        double total = 0.0;
        for (int i = 0; i < (int)items.size(); i++) {
            total += items[i].getTotalPrice();
        }
        return total;
    }

    // View all items currently in cart
    void viewCart() {
        if (items.empty()) {
            cout << "\n[!] Your shopping cart is empty!" << endl;
            return;
        }

        cout << "\n============= YOUR CART =============" << endl;
        for (int i = 0; i < (int)items.size(); i++) {
            items[i].display();
        }
        cout << "-------------------------------------" << endl;
        cout << "Total Cart Value: $" << calculateTotal() << endl;
        cout << "=====================================\n" << endl;
    }

    // Clear cart after checkout
    void clearCart() {
        items.clear();
    }
};

// ==========================================
// Model 4: User / Customer
// ==========================================
class User {
public:
    string name;
    string email;
    string address;

    User() {
        this->name = "Guest";
        this->email = "";
        this->address = "";
    }

    User(string name, string email, string address) {
        this->name = name;
        this->email = email;
        this->address = address;
    }

    void displayUser() {
        cout << "Customer: " << name << endl;
        cout << "Email   : " << email << endl;
        cout << "Address : " << address << endl;
    }
};

// ==========================================
// Model 5: Order
// ==========================================
class Order {
public:
    int orderId;
    User customer;
    vector<CartItem> orderItems;
    double totalAmount;
    string paymentMethod;

    Order(int id, User user, vector<CartItem> items, double total, string payment) {
        this->orderId = id;
        this->customer = user;
        this->orderItems = items;
        this->totalAmount = total;
        this->paymentMethod = payment;
    }

    void printInvoice() {
        cout << "\n==========================================" << endl;
        cout << "             ORDER INVOICE                " << endl;
        cout << "==========================================" << endl;
        cout << "Order ID: #" << orderId << endl;
        customer.displayUser();
        cout << "Payment Method: " << paymentMethod << endl;
        cout << "------------------------------------------" << endl;
        cout << "Items Ordered:" << endl;
        for (int i = 0; i < (int)orderItems.size(); i++) {
            cout << " - " << orderItems[i].product.name 
                 << " x " << orderItems[i].quantity 
                 << " = $" << orderItems[i].getTotalPrice() << endl;
        }
        cout << "------------------------------------------" << endl;
        cout << "Grand Total Paid: $" << totalAmount << endl;
        cout << "Status          : Order Confirmed!" << endl;
        cout << "==========================================" << endl;
        cout << " Thank you for shopping with us!" << endl;
        cout << "==========================================\n" << endl;
    }
};

// Helper function to find product by ID in catalog
int findProductIndex(vector<Product>& inventory, int id) {
    for (int i = 0; i < (int)inventory.size(); i++) {
        if (inventory[i].id == id) {
            return i;
        }
    }
    return -1;
}

// ==========================================
// Main Function (Terminal Application)
// ==========================================
int main() {
    // Seed product catalog
    vector<Product> inventory = {
        Product(101, "Laptop", "Electronics", 750.00, 5),
        Product(102, "Smartphone", "Electronics", 450.00, 10),
        Product(103, "Wireless Headphones", "Accessories", 60.00, 15),
        Product(104, "Mechanical Keyboard", "Accessories", 45.00, 8),
        Product(105, "Backpack", "Lifestyle", 30.00, 20)
    };

    Cart cart;
    int orderIdCounter = 1001;

    cout << "==========================================" << endl;
    cout << "       MINI E-COMMERCE TERMINAL APP       " << endl;
    cout << "==========================================" << endl;

    // Customer details
    string name, email, address;
    cout << "Enter Customer Name: ";
    getline(cin, name);
    if (name.empty()) name = "Student User";

    cout << "Enter Email: ";
    getline(cin, email);
    if (email.empty()) email = "student@example.com";

    cout << "Enter Delivery Address: ";
    getline(cin, address);
    if (address.empty()) address = "Campus Hostel Room 101";

    User customer(name, email, address);
    cout << "\nWelcome, " << customer.name << "! Let's start shopping.\n" << endl;

    int choice = 0;
    while (choice != 6) {
        cout << "---------------- MENU ----------------" << endl;
        cout << "1. View Products" << endl;
        cout << "2. Add Product to Cart" << endl;
        cout << "3. View Cart" << endl;
        cout << "4. Remove Product from Cart" << endl;
        cout << "5. Checkout & Place Order" << endl;
        cout << "6. Exit" << endl;
        cout << "Enter choice (1-6): ";
        
        if (!(cin >> choice)) {
            cin.clear();
            cin.ignore(1000, '\n');
            cout << "Invalid input. Please enter a number between 1 and 6." << endl;
            continue;
        }

        switch (choice) {
            case 1: {
                // View all products
                cout << "\n------------- PRODUCT CATALOG -------------" << endl;
                for (int i = 0; i < (int)inventory.size(); i++) {
                    inventory[i].display();
                }
                cout << "-------------------------------------------\n" << endl;
                break;
            }

            case 2: {
                // Add to cart
                cout << "\n------------- PRODUCT CATALOG -------------" << endl;
                for (int i = 0; i < (int)inventory.size(); i++) {
                    inventory[i].display();
                }
                cout << "-------------------------------------------\n" << endl;

                int prodId, qty;
                cout << "Enter Product ID to add: ";
                cin >> prodId;

                int index = findProductIndex(inventory, prodId);
                if (index == -1) {
                    cout << "[!] Product not found!" << endl;
                    break;
                }

                cout << "Enter Quantity: ";
                cin >> qty;

                if (qty <= 0) {
                    cout << "[!] Quantity must be greater than 0!" << endl;
                    break;
                }

                if (inventory[index].stock < qty) {
                    cout << "[!] Insufficient stock! Only " << inventory[index].stock << " available." << endl;
                    break;
                }

                cart.addItem(inventory[index], qty);
                break;
            }

            case 3: {
                // View Cart
                cart.viewCart();
                break;
            }

            case 4: {
                // Remove item from cart
                if (cart.items.empty()) {
                    cout << "\n[!] Your cart is already empty!" << endl;
                    break;
                }
                cart.viewCart();
                int removeId;
                cout << "Enter Product ID to remove: ";
                cin >> removeId;
                cart.removeItem(removeId);
                break;
            }

            case 5: {
                // Checkout
                if (cart.items.empty()) {
                    cout << "\n[!] Cart is empty! Add products before checkout." << endl;
                    break;
                }

                cart.viewCart();
                double total = cart.calculateTotal();

                cout << "Choose Payment Method:" << endl;
                cout << "1. Cash on Delivery (COD)" << endl;
                cout << "2. UPI" << endl;
                cout << "3. Debit/Credit Card" << endl;
                cout << "Enter payment option (1-3): ";
                int payChoice;
                cin >> payChoice;

                string paymentMethod = "Cash on Delivery";
                if (payChoice == 2) paymentMethod = "UPI";
                else if (payChoice == 3) paymentMethod = "Credit/Debit Card";

                // Deduct stock from inventory
                for (int i = 0; i < (int)cart.items.size(); i++) {
                    int idx = findProductIndex(inventory, cart.items[i].product.id);
                    if (idx != -1) {
                        inventory[idx].stock -= cart.items[i].quantity;
                    }
                }

                // Create Order and print invoice
                Order newOrder(orderIdCounter++, customer, cart.items, total, paymentMethod);
                newOrder.printInvoice();

                // Clear cart after successful order
                cart.clearCart();
                break;
            }

            case 6: {
                cout << "\nThank you for visiting! Have a great day." << endl;
                break;
            }

            default: {
                cout << "\n[!] Invalid choice! Please select between 1 and 6." << endl;
                break;
            }
        }
    }

    return 0;
}
