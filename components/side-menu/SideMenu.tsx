import {
  XIcon,
  PhotographIcon,
  MinusIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import 


const iconStyle = { width: "15px" };

function SideMenu() {
  return (
    <div>
      <div>
        <XIcon style={iconStyle} />
      </div>
      <div>
        <PhotographIcon style={iconStyle} />
        <VideoCameraIcon style={iconStyle} />
        <MinusIcon style={iconStyle} />
      </div>
    </div>
  );
}

export default SideMenu;
