const Gender = ({ onCheckChange, selectedgender}) => {
    return (
    <div className="flex gap-4">
        <div className="form-control">
            <label className={`label gap-2 cursor-pointer ${selectedgender === "male" ? "selected" : ""}`}>
                <span className="label-text">Male</span>
                <input type="checkbox"  className="checkbox border-slate-900" 
                checked={selectedgender === "male"}
                onChange={() => onCheckChange("male")}/>
            </label>
        </div>
        <div className="form-control">
            <label className={`label gap-2 cursor-pointer  ${selectedgender === "female" ? "selected" : ""} `}>
                <span className="label-text">Female</span>
                <input type="checkbox"  className="checkbox border-slate-900"
                checked={selectedgender === "female"}
                onChange={() => onCheckChange("female")}/>
            </label>
        </div>
    </div>
    );
}

export default Gender;