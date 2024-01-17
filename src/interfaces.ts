export interface WheelProps{ 
    wheelSize: number, 
    containerWidth: number, 
    wheelPath: object[]
}

export interface makeWheelProps {
    numberOfSections: number,
    containerWidth: number
}

export type Wheel = {
    path: string | null,
    color: string,
    value: number,
    centroid: [number]
}

export interface Winner {
    color: string,
    index: number
}

export interface RouletteProps {
    numberOfSections: number,
    onWinnerChange: any
}

export interface WinnerTextProps {
    winner: string
}