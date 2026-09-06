import os
import joblib
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

print("🚀 Loading model...")
try:
    model = joblib.load('model.pkl')
    print("✅ Model berhasil dimuat!")
except Exception as e:
    print(f"❌ Gagal memuat model: {e}")
    model = None

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'status': 'online',
        'message': 'API Prediksi Minat CitaRasa berjalan!',
        'endpoints': ['/predict', '/health']
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'ok',
        'model_loaded': model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model belum dimuat'}), 500
    
    try:
        data = request.json
        
        features = np.array([[
            data.get('usia', 1),
            data.get('status', 1),
            data.get('frekuensi', 1),
            data.get('sumber_info', 1),
            data.get('promosi', 1)
        ]])
        
        prediction = model.predict(features)
        minat_score = int(prediction[0])
        
        if minat_score >= 4:
            kategori = "Tinggi"
        elif minat_score >= 3:
            kategori = "Sedang"
        else:
            kategori = "Rendah"
        
        return jsonify({
            'minat': minat_score,
            'kategori': kategori
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
