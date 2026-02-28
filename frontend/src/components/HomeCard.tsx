import React from 'react'
import RoundedIconRectangleButton from './buttons/RoundedIconRectangleButton'

interface HomeCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

function HomeCard({ icon, title, description, onClick }: HomeCardProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-[var(--lightest_pink)] rounded-2xl 
    p-5 w-55 h-50 transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-102 
    active:scale-95" onClick={onClick}>
      <div className="flex items-center justify-center w-12 h-12 bg-[var(--dark-dark-pink)] rounded-2xl mb-2">
        {icon}
      </div>
      <div className="text-lg font-bold text-[var(--darker_pink)] text-center select-none">{title}</div>
      <div className="text-md font-medium text-[var(--medium_pink)] text-center leading-tight select-none">{description}</div>
    </div>
  )
}

export default HomeCard