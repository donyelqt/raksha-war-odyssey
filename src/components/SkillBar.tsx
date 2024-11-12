import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useSkill } from '../store/gameSlice';
import { Skill } from '../types/game.types';

const SkillBar: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedCharacter } = useSelector((state: RootState) => state.game);

  if (!selectedCharacter) return null;

  const handleSkillClick = (skill: Skill) => {
    // Implement skill targeting logic
    console.log(`Using skill: ${skill.name}`);
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 p-2 rounded-lg flex gap-2">
      {selectedCharacter.skills.map((skill) => (
        <button
          key={skill.id}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          onClick={() => handleSkillClick(skill)}
        >
          {skill.name}
        </button>
      ))}
    </div>
  );
};

export default SkillBar; 