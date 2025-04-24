import React, { useState, ChangeEvent } from "react";
import "../App.css";

interface CheckboxProps {
  label: string;
  onChange: (checked: boolean) => void;
  checked: boolean;
}

type Props = {
    onLogout: () => void;
}
const Checkbox: React.FC<CheckboxProps> = ({ label, onChange, checked }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      {label}
    </label>
  );
};

function MainScreen({ onLogout}: Props) {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [textValue, setTextValue] = useState<string>("");
  const [apiValue, setApiValue] = useState<string>("");

  const handleCheckBoxChange1 = (checked: boolean) => {
    setIsChecked1(checked);
  };
  const handleCheckBoxChange2 = (checked: boolean) => {
    setIsChecked2(checked);
  };
  const handleCheckBoxChange3 = (checked: boolean) => {
    setIsChecked3(checked);
  };

  const uncheckOthers = (except: number) => {
    setIsChecked1(except === 1);
    setIsChecked2(except === 2);
    setIsChecked3(except === 3);
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  const handleApiChange = (event: ChangeEvent<HTMLInputElement>) => {
    setApiValue(event.target.value);
  };

  const handleDone = () => {
    const isCheckboxSelected = isChecked1 || isChecked2 || isChecked3;
    if (!isCheckboxSelected) {
      alert("Please select one option.");
      return;
    }
    if (textValue.trim() === "" || apiValue.trim() === "") {
      alert("Please fill out both the email content and the API key.");
      return;
    }
    alert("All good! Submitting...");
  };

  return (
    <div className="App">
      <p>Breaking Chains</p>
      <label htmlFor="my-textbox">Click reply, three dots, copy and paste the email thread content underneath</label>
      <input
        type="text"
        id="my-textbox"
        value={textValue}
        onChange={handleTextChange}
        style={{ width: "400px", height: "400px", fontSize: "12px", textAlign: "left"}}
      />
      <div>
        <Checkbox
          label="Action Items"
          onChange={(checked) => checked && uncheckOthers(1)}
          checked={isChecked1}
        />
        <Checkbox
          label="Summarizing"
          onChange={(checked) => checked && uncheckOthers(2)}
          checked={isChecked2}
        />
        <Checkbox
          label="Message by message breakdown"
          onChange={(checked) => checked && uncheckOthers(3)}
          checked={isChecked3}
        />

      </div>
      <div>
      </div>
      <button onClick={handleDone}>Done</button>
      <button onClick={onLogout}>Log out</button>


    </div>
  );
}

export default MainScreen;
