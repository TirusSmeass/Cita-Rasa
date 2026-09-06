import os
import json
import joblib
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Biar frontend JS bisa akses API dari domain beda

# Load model saat server mulai
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
        'endpoints': ['/predict', '/health', '/feature-importance']
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'ok',
        'model_loaded': model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    """
    Endpoint untuk prediksi minat mahasiswa.
    Input (JSON):
    {
        "usia": 21,          # 0: <18, 1: 18-22, 2: 23-27, 3: 27+
        "status": 1,         # 0: Pelajar, 1: Mahasiswa, 2: Pekerja, 3: Wirausaha
        "frekuensi": 2,      # 0: Tidak pernah, 1: Kadang-kadang, 2: Sering, 3: Sangat sering
        "sumber_info": 1,    # 0: Medsos, 1: Aplikasi, 2: Teman, 3: Internet
        "promosi": 1         # 0: Sangat menarik, 1: Cukup menarik, 2: Kurang menarik
    }
    Output (JSON):
    {
        "minat": 4,          # Skor 1-5
        "kategori": "Tinggi" # Rendah/Sedang/Tinggi
    }
    """
    if model is None:
        return jsonify({'error': 'Model belum dimuat'}), 500
    
    try:
        data = request.json
        
        # Ambil fitur dari request
        features = np.array([[
            data.get('usia', 1),
            data.get('status', 1),
            data.get('frekuensi', 1),
            data.get('sumber_info', 1),
            data.get('promosi', 1)
        ]])
        
        # Prediksi
        prediction = model.predict(features)
        minat_score = int(prediction[0])
        
        # Konversi ke kategori
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

@app.route('/feature-importance', methods=['GET'])
def feature_importance():
    """
    Mengembalikan daftar fitur terpenting dari model.
    """
    if model is None:
        return jsonify({'error': 'Model belum dimuat'}), 500
    
    try:
        feature_names = ['Usia', 'Status', 'Frekuensi Konsumsi', 'Sumber Informasi', 'Penilaian Promosi']
        importance = model.feature_importances_
        
        # Sorting dari yang tertinggi ke terendah
        sorted_idx = np.argsort(importance)[::-1]
        
        result = []
        for i in sorted_idx:
            result.append({
                'feature': feature_names[i],
                'importance': float(importance[i])
            })
        
        return jsonify({
            'feature_importance': result,
            'top_feature': result[0]['feature'] if result else None
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
