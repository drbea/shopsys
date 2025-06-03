import Logo from '../../../public/logo.jpeg';

export default function TopBar() {
  return (
    <div className="bg-white shadow-md h-30 flex items-center justify-between px-4">
      <div className="flex items-center space-x-2">
        {/* <img src={Logo} className="h-10 w-10 object-contain rounded-full" alt="Logo" /> */}
        <h1 className="text-xl font-semibold text-teal-700 hidden sm:block">Shopsys</h1>
      </div>
      <span className="text-sm text-gray-500 hidden sm:block">Bienvenue dans votre espace de gestion</span>
    </div>
  );
}
