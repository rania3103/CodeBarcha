function NavBar() {
    return (
        <div className="bg-gray-900 h-16 flex items-center justify-between px-4">
          <img src="/img/logo.png" alt="Logo" className="h-12 pt-3 pl-2" />    
          <button className="border-l-4 border-indigo-500 px-6 text-white font-bold ml-auto hover:text-indigo-500">Logout</button>
        </div>
      );
}

export default NavBar