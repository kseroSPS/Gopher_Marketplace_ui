import { useState } from 'react';

const ProductCard = ({ product, currentUser }) => {
  console.log('currentUser:', currentUser);
  console.log('product.user:', product.user);
  console.log('product.user_name:', product.user_name);
  console.log("product:", product);
  console.log("user:", sessionStorage.getItem("User"));
  const [showInfo, setShowInfo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  currentUser = sessionStorage.getItem("User");
  const handleInfoClick = () => {
    setShowInfo((prev) => !prev);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Simulate sending updated data to the backend
    console.log('Updated product:', { name, price, category, description });

    // Call your API to save the changes here
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Revert changes
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setDescription(product.description);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        maxWidth: '250px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        margin: '20px auto',
      }}
    >
      {/* Image */}
      <div
        style={{
          width: '100%',
          height: '150px',
          backgroundColor: '#f1f1f1',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '15px',
        }}
      >
        <img
          src={product.img || 'https://via.placeholder.com/150'}
          alt={product.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: '8px',
          }}
        />
      </div>

      {isEditing ? (
        <div>
          {/* Editable Fields */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />

          {/* Save and Cancel Buttons */}
          <button
            onClick={handleSaveClick}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              marginRight: '10px',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
          <button
            onClick={handleCancelClick}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          {/* Product Details */}
          <h3 style={{ fontSize: '18px', color: '#333', margin: '10px 0' }}>
            {name}
          </h3>
          <p
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#f39c12',
              margin: '10px 0',
            }}
          >
            ${price}
          </p>

          <button
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={handleInfoClick}
          >
            {showInfo ? 'Close Info' : 'Info'}
          </button>

          {showInfo && (
            <div
              style={{
                marginTop: '10px',
                textAlign: 'left',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                backgroundColor: '#f1f1f1',
              }}
            >
              <p>
                <strong>Description:</strong> {description}
              </p>
              <p>
                <strong>Category:</strong> {category}
              </p>
              <p>
                <strong>User:</strong> {product.user_name}
              </p>
              <p>
                <strong>Course:</strong> {product.course}
              </p>
              <p>
                <strong>Professor:</strong> {product.professor}
              </p>
            </div>
          )}

          {/* Edit Button - Only for product creator */}
          {currentUser?.user_name === product.user_name && (
            <>
            {console.log({currentUser}, {product}, localStorage.getItem("User"))}
            <button
              onClick={handleEditClick}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: '#ffc107',
                color: '#000',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Edit
            </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
