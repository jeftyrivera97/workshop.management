

export const SearchInput = ({placeholder}: {placeholder: string}) => {
    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">Buscar</legend>
            <input type="text" className="input" placeholder={placeholder} />
        </fieldset>
    )
}
