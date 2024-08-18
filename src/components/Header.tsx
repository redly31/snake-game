import { FaCirclePause, FaCirclePlay, FaRotateRight } from "react-icons/fa6";

interface HeaderProps {
    isGameOver: boolean;
    isGamePaused: boolean;
    restart: () => void;
    setIsGamePaused: React.Dispatch<React.SetStateAction<boolean>>
    score: number;
}

export default function Header(props: HeaderProps) {
    const {isGameOver, restart, isGamePaused, setIsGamePaused, score} = props
    const play = () => setIsGamePaused(false)
    const stop = () => setIsGamePaused(true)

  return (
    <header className="flex justify-between w-full py-5 items-center">
        <h1 className="text-3xl">{isGameOver ? "Game Over!" : "snake-game"}</h1>
        <h1 className="text-3xl">Очки: {score}</h1>
        <div className="flex gap-3">
            <button onClick={restart}><FaRotateRight size={30}/></button>
            {!isGameOver &&
                <>
                    {!isGamePaused
                        ? <button onClick={stop} className=""><FaCirclePause size={30}/></button>
                        : <button onClick={play} className=""><FaCirclePlay size={30} /></button>
                    } 
                </>
            }
             
        </div>
        
    </header>
  )
}
