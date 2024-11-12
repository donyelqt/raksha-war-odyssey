import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Skill } from '../types/game.types';

interface SkillBarProps {
  onSkillSelect: (skill: Skill | null) => void;
}

const SkillBar: React.FC<SkillBarProps> = ({ onSkillSelect }) => {
  const { selectedCharacter } = useSelector((state: RootState) => state.game);

  if (!selectedCharacter) return null;

  const handleSkillClick = (skill: Skill) => {
    if (skill.cooldown === 0) {
      onSkillSelect(skill);
    }
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 p-2 rounded-lg flex gap-2">
      {selectedCharacter.skills.map((skill: Skill) => (
        <button
          key={skill.id}
          className={`px-4 py-2 rounded text-white relative ${
            skill.cooldown === 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'
          }`}
          onClick={() => handleSkillClick(skill)}
          disabled={skill.cooldown > 0}
        >
          {skill.name}
          {skill.cooldown > 0 && (
            <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {skill.cooldown}
            </span>
          )}
        </button>
      ))}
      <button
        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white"
        onClick={() => onSkillSelect(null)}
      >
        Cancel
      </button>
    </div>
  );
};

export default SkillBar; 