import LogOut from "./LogOut";
function NavBar() {
  return (
    <div className="bg-gray-900 h-16 flex items-center justify-between px-4 border-b-2 border-indigo-500 z-10 ">
      <img src="/img/logo.png" alt="Logo" className="h-12 pt-3 pl-2" />
      <LogOut />
    </div>
  );
}

export default NavBar;
