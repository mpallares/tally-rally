import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import Web3MailContext from '../../modules/Web3mail/context/web3mail';
import TalentLayerIdForm from '../../components/Form/TalentLayerIdForm';

export default function Onboarding() {
  const { protectEmailAndGrantAccess } = useContext(Web3MailContext);
  console.log('protectEmailAndGrantAccess', protectEmailAndGrantAccess);
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleInterestChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInterest(e.target.value);
  };

  const handleAddInterest = () => {
    if (interest.trim() !== '') {
      setInterests([...interests, interest]);
      setInterest('');
    }
  };

  const handleDeleteInterest = (index: number) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    setInterests(updatedInterests);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    protectEmailAndGrantAccess(email);
  };
  return (
    <>
      <form className='w-64 mx-auto mt-8' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
            What is your email?
          </label>
          <input
            type='email'
            id='email'
            className='w-full p-2 border rounded-md  text-black'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='interest'>
            What are your interests?
          </label>
          <div className='flex'>
            <input
              type='text'
              id='interest'
              className='w-full p-2 border rounded-md text-black'
              value={interest}
              onChange={handleInterestChange}
            />
            <button
              type='button'
              className='ml-2 p-2 bg-blue-500 text-white rounded-md'
              onClick={handleAddInterest}>
              Add
            </button>
          </div>
        </div>
        <ul className='mb-4'>
          {interests.map((interest, index) => (
            <li
              key={index}
              className='inline-block bg-blue-200 text-blue-800 px-2 py-1 m-1 rounded-full'>
              {interest}
              <button
                type='button'
                className='ml-2 p-1 text-red-500'
                onClick={() => handleDeleteInterest(index)}>
                &#10006;
              </button>
            </li>
          ))}
        </ul>
        <button type='submit' className='p-2 bg-blue-500 text-white rounded-md'>
          Submit
        </button>
      </form>
      <TalentLayerIdForm />
    </>
  );
}

const InterestForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleInterestChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInterest(e.target.value);
  };

  const handleAddInterest = () => {
    if (interest.trim() !== '') {
      setInterests([...interests, interest]);
      setInterest('');
    }
  };

  const handleDeleteInterest = (index: number) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    setInterests(updatedInterests);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // protectEmailAndGrantAccess(email);
  };

  return (
    <form className='w-64 mx-auto mt-8' onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
          What is your email?
        </label>
        <input
          type='email'
          id='email'
          className='w-full p-2 border rounded-md  text-black'
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='interest'>
          What are your interests?
        </label>
        <div className='flex'>
          <input
            type='text'
            id='interest'
            className='w-full p-2 border rounded-md text-black'
            value={interest}
            onChange={handleInterestChange}
          />
          <button
            type='button'
            className='ml-2 p-2 bg-blue-500 text-white rounded-md'
            onClick={handleAddInterest}>
            Add
          </button>
        </div>
      </div>
      <ul className='mb-4'>
        {interests.map((interest, index) => (
          <li
            key={index}
            className='inline-block bg-blue-200 text-blue-800 px-2 py-1 m-1 rounded-full'>
            {interest}
            <button
              type='button'
              className='ml-2 p-1 text-red-500'
              onClick={() => handleDeleteInterest(index)}>
              &#10006;
            </button>
          </li>
        ))}
      </ul>
      <button type='submit' className='p-2 bg-blue-500 text-white rounded-md'>
        Submit
      </button>
    </form>
  );
};
