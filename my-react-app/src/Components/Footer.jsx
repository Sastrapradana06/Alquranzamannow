import { FaTiktok } from "react-icons/fa";
import { AiFillInstagram,  AiFillLinkedin } from "react-icons/ai";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className=" w-full p-2 relative bottom-0 bg-[#073535]">
      <div className=" flex flex-col items-center">
        <div className="text-[.9rem] text-white">
          <p>Powered by | Sastrapradana💙</p>
        </div>
        <div className=" flex justify-center items-center gap-4 mt-2">
          <Link
            to="https://www.tiktok.com/@sstra_pradana?_t=8cwGCTCFYif&_r=1">
            <FaTiktok color="white" size={23} />
          </Link>
          <Link to="https://instagram.com/sastrapradn?igshid=NTc4MTIwNjQ2YQ==">
            <AiFillInstagram color="white" size={23} />
          </Link>
          <Link to="https://www.linkedin.com/in/sastra-pradana-a50b72252/">
            <AiFillLinkedin color="white" size={23} />
          </Link>
        </div>
      </div>
    </div>
  );
}
