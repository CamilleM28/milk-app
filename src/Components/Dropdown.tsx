import { useState } from "react";
import "../Styles/Dropdown.css";

interface IProps {
  setType: React.Dispatch<React.SetStateAction<string[]>>;
  types: string[];
  milkType: string;
}

const Dropdown = ({ setType, types, milkType }: IProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheck = (milkType: string) => {
    if (checked === false) {
      setChecked(true);
      setType((type) => [...type, milkType]);
    } else {
      setChecked(false);
      setType((type) => type.filter((item) => item !== milkType));
    }
  };

  return (
    <div>
      <input
        className="options"
        type="checkbox"
        name={milkType}
        onClick={() => handleCheck(milkType)}
      ></input>
      {milkType}
    </div>
  );
};

export default Dropdown;
