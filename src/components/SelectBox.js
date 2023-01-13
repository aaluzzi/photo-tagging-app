import SelectBoxItem from "./SelectBoxItem";

function SelectBox(props) {
    if (props.visible) {
        return (
            <div className="select-box" style={{position: "absolute", top: props.y, left: props.x}}>
                {props.characters.filter(character => !character.found).map(character => {
                    return <SelectBoxItem onSelectBoxSelect={props.onClick} characterName={character.name} />;
                })}
            </div>
        );
    }
    return null;
}

export default SelectBox;