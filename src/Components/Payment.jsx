import UPi from '../assets/PUI.png';
import gpay from '../assets/gpay.png';
import paytm from '../assets/paytm.png';
import card from '../assets/card.png';
import phonepay from '../assets/phonepay.png';
import Header from '../Components/Header';
import {ToastContainer, toast} from 'react-toastify';


const Payment = () => {
  const api = import.meta.env.VITE_APP_URL;
  const token = localStorage.getItem("token");

  const payBtnClick = async() =>{
    try{

      let amount = 50;
      let order = await fetch(`${api}/teacher/createorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });
  
    order = await order.json();
    
  
    var options = {
      key: "rzp_test_RldB4sV5LgYUzp",
      amount: order.amount, // paise
      currency: "INR",
      name: "EXAMLY",
      description: "Test Payment",
      order_id: order.id,
      method: {
      upi: true,
      card: true,
      netbanking: false,
      wallet: false,
      emi: false,
      payLater: false
    },
  
      handler: function (response) {
        // console.log(response);
  
        fetch(`${api}/teacher/verifypayment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({response, token}),
        })
          .then(r => r.json())
          .then(data => {
            if(data.success){
              console.log(data.message);
              toast.success("Now you can set question.");
            }else{
              toast.error("Paymet failed.\nTry Again.");
            }
          });
      },
  
      modal: {
        ondismiss: function () {
          alert("Payment Fail\nTry Again");
        },
      },
    };  
    new Razorpay(options).open();
    
    }catch(err){
      console.log(err);
      console.log(err.message);
      console.log("This error is coming from payBtnClick and from line no 74 and from Payment.jsx file");
    }
  }

  return (
    <>
        <ToastContainer/>
        <Header/>
        <div style={styles.page}>
          <div style={styles.card}>
            <h2 style={styles.title}>Pay Per Question</h2>
    
            <div style={styles.priceBox}>
              👉 <span style={styles.priceText}>Har Question = ₹50 Only</span>
            </div>
    
            <p style={styles.desc}>
              Unlock this question by paying ₹50 online.
            </p>
    
            <div style={styles.methods}>
              <img src={UPi} alt="UPI" style={styles.icon} />
              <img src={gpay} alt="GPay" style={styles.icon} />
              <img src={phonepay} alt="PhonePe" style={styles.icon} />
              <img src={paytm} alt="Paytm" style={styles.icon} />
              <img src={card} alt="Card" style={styles.icon} />
            </div>
    
            <button onClick={payBtnClick} style={styles.button}>
              Pay ₹50 & Continue
            </button>
    
            <div style={styles.footer}>
              <span>🔒 Secure Payment</span>
              <span>⚡ Instant Access</span>
            </div>
          </div>
        </div>
    </>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F3F6FB",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "360px",
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
    textAlign: "center",
  },

  title: {
    color: "#243A7A",
    marginBottom: "16px",
  },

  priceBox: {
    backgroundColor: "#FFF2CC",
    padding: "12px",
    borderRadius: "8px",
    fontWeight: "bold",
    marginBottom: "12px",
  },

  priceText: {
    color: "#D97706",
  },

  desc: {
    color: "#555",
    marginBottom: "16px",
  },

  methods: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  icon: {
    width: "50px",
    height: "32px",
    objectFit: "contain",
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(90deg, #28A745, #1E8E3E)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    fontSize: "12px",
    color: "#6B7280",
  },
};

export default Payment;
