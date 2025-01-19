import { gopherImg } from "../utils";
import { useNavigate } from 'react-router-dom';



const NavBar = () => {
    const navigate = useNavigate();

    const pages = [
        { name: 'Home', route: '/home' },
        { name: 'Books', route: '/books' },
        { name: 'Clothes', route: '/clothes' },
        { name: 'School Supplies', route: '/textbooks' },
    ];

    const handleOnClick = (route) => {
        navigate(route);
    };

    return (
        <header className="w-full py-2 sm:px-10 px-5 flex justify-between items-center">
            <nav className="flex w-full screen max-width">
                <div className="flex flex-1 justify-center max-sm:hidden">
                    {pages.map(({ name, route }) => (
                        <div
                            key={name}
                            className="px-11 font-serif text-base translate-y-6 cursor-pointer text-yellow hover:text-white"
                            onClick={() => handleOnClick(route)} style={{paddingLeft:'150px'}}
                        >
                            {name}
                        </div>
                    ))}
                </div>
                <div className="flex items-center space-x-4 translate-y-[-1]">
                 <button
                 onClick={() => navigate("/add-product")} style={{ backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px ',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                marginLeft: '10px'
        }}
        >
          Add Product
        </button>
      </div>
                <div className="flex items-baseline translate-y-[-2px] max-sm:justify-end max-sm:flex-1 cursor-pointer">
                    <img src={gopherImg} alt="logo" width={100} height={50} />
                </div>
            </nav>
           
        </header>
    );
};

export default NavBar;
