export const mapCoordinatesToDegrees = (x: number, y: number, centerX: number, centerY: number) => {
    const angleRad = Math.atan2(y - centerY, x - centerX);
    let angleDeg = ((angleRad * 180) / Math.PI);
    
    if (angleDeg < 0) {
        angleDeg += 360;
    }
    
    return angleDeg;
};


export const radiansToDegrees = (radians: number): number => {
    return (radians * 180) / Math.PI;
};


export const getVelocity = (velocityX: number, velocityY: number, deg: number): number => {
    const absVelocityX = Math.abs(velocityX);
    const absVelocityY = Math.abs(velocityY);
    const condition = absVelocityX > absVelocityY;
    
    switch (true) {
        case deg < 91:
            return condition ? -velocityX : velocityY;
        case deg < 181:
            return condition ? -velocityX : -velocityY;
        case deg < 271:
            return condition ? velocityX : -velocityY;
        case deg <= 360:
            return condition ? velocityX : velocityY;
    }
    
    return 0;
}