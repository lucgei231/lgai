import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

def load_data(data_path):
    data = pd.read_csv(data_path)
    return data

def preprocess_data(data):
    # Example preprocessing steps
    data.fillna(0, inplace=True)
    X = data.drop('target', axis=1)
    y = data['target']
    return X, y

def train_model(X_train, y_train):
    model = RandomForestClassifier()
    model.fit(X_train, y_train)
    return model

def save_model(model, model_path):
    joblib.dump(model, model_path)

def main():
    raw_data_path = os.path.join('data', 'raw', 'data.csv')  # Update with actual data file
    processed_data_path = os.path.join('data', 'processed', 'processed_data.csv')  # Update as needed
    model_path = os.path.join('models', 'trained_model.pkl')

    # Load and preprocess data
    data = load_data(raw_data_path)
    X, y = preprocess_data(data)

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train the model
    model = train_model(X_train, y_train)

    # Save the trained model
    save_model(model, model_path)

    # Evaluate the model
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f'Model accuracy: {accuracy:.2f}')

if __name__ == '__main__':
    main()