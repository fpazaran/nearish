import React, { useState } from 'react'

// utils
import { dayNumberFromIndex } from '../utils/visits';
import { CATEGORIES } from '../utils/activities';
import Selector from '../components/Selector';

// icons
import { FiX } from 'react-icons/fi';

interface VisitAddActivityModalProps {
  onClose: () => void;
  isOpen: boolean;
  dayIndex: number;
  onAddActivity: (name: string, category: string) => void;
}

const SELECTOR_OPTIONS = [{ label: 'Create Custom', value: 'custom' }, { label: 'Select From Library', value: 'library' }];

function VisitAddActivityModal({ onClose, isOpen, dayIndex, onAddActivity }: VisitAddActivityModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [selector, setSelector] = useState(SELECTOR_OPTIONS[0].value);

  const handleAddActivity = () => {
    if (name.trim() === '') {
      return;
    }
    onAddActivity(name, category);
    setName('');
    setCategory(CATEGORIES[0]);
    setSelector(SELECTOR_OPTIONS[0].value);
  }

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-[var(--lightest_pink)] rounded-3xl shadow-2xl p-8 w-140 max-w-[90vw] flex flex-col gap-4 items-start animate-in fade-in zoom-in-70 duration-300">
        {/* Message */}
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-left text-3xl font-bold text-[var(--darker_pink)] w-full">
            Add Activity For Day {dayNumberFromIndex(dayIndex)}
          </h1>
          <button className="text-lg font-medium text-pink-dark hover:opacity-60 active:opacity-20 transition-opacity select-none cursor-pointer"
            onClick={onClose}>
            <FiX className="w-10 h-10" />
          </button>
        </div>
        <Selector options={SELECTOR_OPTIONS} defaultValue={selector} onChange={setSelector} className="w-full justify-between" textStyle="text-xl font-medium px-10 py-1" />
        
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <h2 className="text-2xl font-bold text-pink-dark w-full text-left">
            Description
          </h2>
          <input type="text" 
                  placeholder="e.g. Go to the beach" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full bg-pink-bg text-pink-dark font-bold text-lg px-6 py-3 rounded-2xl cursor-text transition-opacity select-none outline-none" />
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-2">
          <h2 className="text-2xl font-bold text-pink-dark w-full text-left">
            Category
          </h2>
          <select value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className="w-full bg-pink-bg text-pink-dark font-bold text-lg px-6 py-3 rounded-2xl cursor-pointer hover:opacity-80 transition-opacity select-none outline-none" >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        
        {/* Add Activity Button */}
        <button
          onClick={handleAddActivity}
          className="w-full bg-pink-dark text-pink-light font-medium text-lg px-6 py-3 rounded-2xl cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity shadow-lg select-none"
        >
          + Add Activity
        </button>
      </div>
    </div>
  )
}

export default VisitAddActivityModal