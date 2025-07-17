

export const CountInput = ({valor, descripcion}: {valor: number, descripcion: string}) => {
    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">{descripcion}</legend>
            <input type="text" className="input" value={valor} readOnly />
        </fieldset>
    )
}
