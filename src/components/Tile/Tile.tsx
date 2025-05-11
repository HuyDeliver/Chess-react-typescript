import './Tile.css'

interface Props {
    image?: string,
    number: number
}
export default function Tile({ image, number }: Props) {
    if (number % 2 === 0) {
        return <div className='Tile black-tile'>{image && <div className="chess-pieces" style={{ backgroundImage: `url(${image})` }}></div>}</div>
    } else {
        return <div className='Tile white-tile'>{image && <div className="chess-pieces" style={{ backgroundImage: `url(${image})` }}></div>}</div>
    }

}