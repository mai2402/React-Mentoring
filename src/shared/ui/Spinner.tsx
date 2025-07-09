export default function Spinner() {
    return (
        <div className="spinner">
          <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                className="spinner__icon"
                xmlns="http://www.w3.org/2000/svg"
                >
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="60"
                    strokeDashoffset="20"
                />
             </svg>

        </div>
    );
}