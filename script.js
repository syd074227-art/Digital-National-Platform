body {
  background: #0B0C10;
  color: #FFF;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header-kr {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
}

.header-kr h1 {
  color: #00BFFF;
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 191, 255, 0.7);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
}

.form-container {
  max-width: 500px;
  margin: 0 auto;
  background: #1F2833;
  padding: 20px;
  border-radius: 10px;
}

.form-container label {
  display: block;
  margin-top: 10px;
}

.form-container input, select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 5px;
  border: none;
}

button {
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  background: #00BFFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background: #009ACD;
}

.id-preview {
  text-align: center;
  margin-top: 10px;
}

.id-preview img {
  max-width: 100%;
  border: 2px solid #00BFFF;
  border-radius: 5px;
  margin-top: 5px;
}

.example-text {
  font-size: 0.9rem;
  color: #aaa;
}

/* التحذيرات */
#error-msg {
  color: #FF3B3B;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  animation: pulseMsg 1s infinite;
  margin-top: 10px;
}

@keyframes pulseMsg {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
}

.hidden { display: none; }
