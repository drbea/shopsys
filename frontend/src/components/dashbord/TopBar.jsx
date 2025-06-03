
import Logo from '../../../public/logo.jpeg';


export default function TopBar(){


return (

  <div className="bg-gray-800 shadow h-16 flex items-center justify-center text-2xl font-bold">
    <img src={Logo} className=" h-12 object-contain w-full" alt="notre logo" />
  </div>
);


}