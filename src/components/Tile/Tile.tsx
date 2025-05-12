import './Tile.css'

interface Props {
    image?: string,
    number: number,
    highlight: boolean
}
export default function Tile({ image, number, highlight }: Props) {

    const className: string = ["Tile",
        number % 2 === 0 && "black-tile",
        number % 2 !== 0 && "white-tile",
        highlight && "tile-highlight"].filter(Boolean).join(' ')
    return (
        <div className={className}>
            {image && <div className="chess-pieces" style={{ backgroundImage: `url(${image})` }}></div>}
        </div>
    )

}