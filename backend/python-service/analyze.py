
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({'message': 'Python analysis service is running!'})

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        file = request.files.get('file')
        if not file:
            return jsonify({'error': 'No file provided'}), 400
        df = pd.read_csv(file)
        rows, cols = df.shape
        numeric_summary = {}
        for col in df.select_dtypes(include='number').columns:
            numeric_summary[col] = {
                'min': round(float(df[col].min()), 2),
                'max': round(float(df[col].max()), 2),
                'mean': round(float(df[col].mean()), 2),
                'median': round(float(df[col].median()), 2),
            }
        columns = {col: str(dtype) for col, dtype in df.dtypes.items()}
        preview = df.head(5).to_dict(orient='records')
        return jsonify({'rows': rows, 'columns': cols, 'column_info': columns, 'numeric_summary': numeric_summary, 'preview': preview})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000, debug=True)