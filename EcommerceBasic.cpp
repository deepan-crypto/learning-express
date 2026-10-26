#include <bits/stdc++.h>
using namespace std;

mutex mtx;

class Product{
    public:
    string name;
    double price;
    int stock;

    Product(string name,double price,int stock){
        this->name=name;
        this->price=price;
        this->stock=stock;
    }
};

class Customer{
    public:
    string name;
    vector<Product*> cartProducts;
    vector<int> cartQuantities;

    Customer(string name){
        this->name=name;
    }

    void addToCart(Product* p,int quantity){
        cartProducts.push_back(p);
        cartQuantities.push_back(quantity);
        cout<<name<<" added "<<quantity<<" x "<<p->name<<" to cart"<<endl;
    }

    void showCart(){
        cout<<"----- Cart of "<<name<<" -----"<<endl;
        double total=0;
        for(int i=0;i<cartProducts.size();i++){
            cout<<cartProducts[i]->name<<" x "<<cartQuantities[i]<<" = "<<cartProducts[i]->price*cartQuantities[i]<<endl;
            total=total+cartProducts[i]->price*cartQuantities[i];
        }
        cout<<"Cart total is "<<total<<endl;
        cout<<"-------------------------------------------------------------"<<endl;
    }

    void checkout(){
        mtx.lock();
        double total=0;
        for(int i=0;i<cartProducts.size();i++){
            Product* p=cartProducts[i];
            int quantity=cartQuantities[i];
            if(p->stock>=quantity){
                this_thread::sleep_for(chrono::milliseconds(100));
                p->stock=p->stock-quantity;
                total=total+p->price*quantity;
                cout<<name<<" bought "<<quantity<<" x "<<p->name<<endl;
            }
            else{
                cout<<name<<" could not buy "<<p->name<<" because only "<<p->stock<<" left in stock"<<endl;
            }
        }
        cout<<"Order placed for "<<name<<" and bill amount is "<<total<<endl;
        cout<<"-------------------------------------------------------------"<<endl;
        cartProducts.clear();
        cartQuantities.clear();
        mtx.unlock();
    }
};

void checkoutThread(Customer* c){
    c->checkout();
}

int main(){
    vector<Product*>products = {
        new Product("Laptop",55000,1),
        new Product("Mobile",15000,5),
        new Product("Headphones",1500,10),
    };

    cout<<"Products available in store"<<endl;
    for(auto p:products){
        cout<<p->name<<" - Rs."<<p->price<<" - stock "<<p->stock<<endl;
    }
    cout<<"-------------------------------------------------------------"<<endl;

    Customer John("John");
    Customer David("David");

    John.addToCart(products[0],1);
    John.addToCart(products[2],2);
    David.addToCart(products[0],1);
    David.addToCart(products[1],1);

    John.showCart();
    David.showCart();

    cout<<"Both customers are checking out at the same time!"<<endl;
    thread t1(checkoutThread,&John);
    thread t2(checkoutThread,&David);
    t1.join();
    t2.join();

    cout<<"Stock left in store"<<endl;
    for(auto p:products){
        cout<<p->name<<" - stock "<<p->stock<<endl;
    }

    for(auto p:products){
        delete p;
    }
}
