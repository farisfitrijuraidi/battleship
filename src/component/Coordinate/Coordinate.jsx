import './Coordinate.css'

export const Coordinate = ({className, direction}) => {
    return (
        <>
            <div className={`coordinate-${direction === 'horizontal' ? 'horizontal' : 'vertical'} ${className}`}>
                <div className='coordinate-cell'>0</div>
                <div className='coordinate-cell'>1</div>
                <div className='coordinate-cell'>2</div>
                <div className='coordinate-cell'>3</div>
                <div className='coordinate-cell'>4</div>
                <div className='coordinate-cell'>5</div>
                <div className='coordinate-cell'>6</div>
                <div className='coordinate-cell'>7</div>
                <div className='coordinate-cell'>8</div>
                <div className='coordinate-cell'>9</div>
            </div>
        </>
    )    
}