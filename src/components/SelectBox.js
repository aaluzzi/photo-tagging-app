import SelectBoxItem from "./SelectBoxItem";

function SelectBox(props) {
    if (true) {
        return (
            <div id="select-box" style={{
                    visibility: props.visible ? "visible" : "hidden",
                    position: "absolute", 
                    top: props.y, 
                    left: props.x
                }}>
                {props.characters.length > 0 ? props.characters.filter(character => !character.found).map(character => {
                    return <SelectBoxItem onSelectBoxSelect={props.onClick} characterName={character.name} />;
                }) : null}
            </div>
        );
    }
    return null;
}

export default SelectBox;