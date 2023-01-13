function SelectBoxItem(props) {
    return <div className="select-box-item" onClick={e => props.onSelectBoxSelect(props.characterName)}>{props.characterName}</div>
}

export default SelectBoxItem;