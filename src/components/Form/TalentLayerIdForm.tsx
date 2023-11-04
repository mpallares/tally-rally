import { useWeb3Modal } from '@web3modal/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import TalentLayerContext from '../../context/talentLayer';
import { useChainId } from '../../hooks/useChainId';
import useMintFee from '../../hooks/useMintFee';
import useTalentLayerClient from '../../hooks/useTalentLayerClient';
import { NetworkEnum } from '../../types';
import { createTalentLayerIdTransactionToast, showErrorTransactionToast } from '../../utils/toast';
import HelpPopover from '../HelpPopover';
import { delegateMintID } from '../request';
import { HandlePrice } from './HandlePrice';
import SubmitButton from './SubmitButton';
import Web3MailContext from '../../modules/Web3mail/context/web3mail';
import { createWeb3mailToast } from '../../modules/Web3mail/utils/toast';
import { toast } from 'react-toastify';

interface IFormValuesTalentLayerId {
  handle: string;
  email: string;
  skills: any[];
}

interface IFormValuesEmail {
  email: string;
  consentInfo?: string[];
}

interface IFormValuesInterests {
  interests: string[];
}

const initialValuesTalentLayerId: IFormValuesTalentLayerId = {
  handle: '',
  email: '',
  skills: [],
};

const initialValuesEmail: IFormValuesEmail = {
  email: '',
  consentInfo: [],
};

const initialValuesInterests: IFormValuesInterests = {
  interests: [],
};

function TalentLayerIdForm() {
  const chainId = useChainId();
  const { open: openConnectModal } = useWeb3Modal();
  const { platformHasAccess } = useContext(Web3MailContext);
  const { account, refreshData } = useContext(TalentLayerContext);
  const { data: walletClient } = useWalletClient({ chainId });
  const publicClient = usePublicClient({ chainId });
  const talentLayerClient = useTalentLayerClient();
  const { calculateMintFee } = useMintFee();
  const { user } = useContext(TalentLayerContext);
  const { protectEmailAndGrantAccess, emailIsProtected } = useContext(Web3MailContext);

  const validationSchemaTalentLayerId = Yup.object().shape({
    handle: Yup.string()
      .min(2)
      .max(10)
      .matches(/^[a-z0-9][a-z0-9-_]*$/, 'Only a-z, 0-9 and -_ allowed, and cannot begin with -_')
      .when('isConnected', {
        is: account && account.isConnected,
        then: schema => schema.required('handle is required'),
      }),
  });

  const validationSchemaEmail = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    // consentInfo: Yup.array().of(Yup.string()).min(1, 'Select at least one consent option'),
  });

  const validationSchemaInterests = Yup.object().shape({
    interests: Yup.array().of(Yup.string()).min(1, 'Select at least one interest'),
  });

  const onSubmitTalentLayerId = async (
    submittedValues: IFormValuesTalentLayerId,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (account && account.address && account.isConnected && publicClient && walletClient) {
      try {
        let tx;
        const handlePrice = calculateMintFee(submittedValues.handle);

        if (process.env.NEXT_PUBLIC_ACTIVE_DELEGATE_MINT === 'true') {
          const response = await delegateMintID(
            chainId,
            submittedValues.email,
            submittedValues.skills,
            submittedValues.handle,
            String(handlePrice),
            account.address,
          );
          tx = response.data.transaction;
        } else {
          if (talentLayerClient) {
            tx = await talentLayerClient.profile.create(submittedValues.handle);
          }
        }
        await createTalentLayerIdTransactionToast(
          chainId,
          {
            pending: 'Minting your Talent Layer Id...',
            success: 'Congrats! Your Talent Layer Id is minted',
            error: 'An error occurred while creating your Talent Layer Id',
          },
          publicClient,
          tx,
          account.address,
        );

        setSubmitting(false);
        refreshData();

        if (process.env.NEXT_PUBLIC_ACTIVE_WEB3MAIL == 'true' && !platformHasAccess) {
          createWeb3mailToast();
        }
      } catch (error: any) {
        showErrorTransactionToast(error);
      }
    } else {
      openConnectModal();
    }
  };

  const onSubmitEmail = async (
    submittedValues: IFormValuesEmail,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (user && walletClient && publicClient) {
      try {
        const promise = protectEmailAndGrantAccess(submittedValues.email);
        console.log('promise', promise);

        await toast.promise(promise, {
          pending: 'Pending transactions, follow instructions in your wallet',
          success: 'Access granted succefully',
          error: 'An error occurred while granting access',
        });
        setSubmitting(false);
      } catch (error) {
        showErrorTransactionToast(error);
      }
    } else {
      openConnectModal();
    }
  };

  const onSubmitInterests = async (
    submittedValues: IFormValuesInterests,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {};

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const web3Tags: string[] = [
    'DEFI',
    'NFTS',
    'TRADING',
    'METAVERSE',
    'DAO',
    'PRIVACY',
    'P2P',
    'L2',
  ];
  const networkTags: string[] = ['ETH', 'BTC', 'POLYGON', 'OP', 'BASE', 'FILECOIN', 'ARB', 'BNB'];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const options = ['Marketing', 'Research'];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(selectedOption => selectedOption !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className='p-10 mb-50'>
      <Formik
        initialValues={initialValuesTalentLayerId}
        onSubmit={onSubmitTalentLayerId}
        validationSchema={validationSchemaTalentLayerId}>
        {({ isSubmitting, values }) => (
          <Form>
            <div className='bg-trorange p-10'>
              <p className='mb-4'>Mint My ID 🏎️</p>
              <div className='flex py-4 px-4 mb-2 sm:px-0 items-center flex-row rounded bg-trorange'>
                <div className='sm:px-6 flex flex-row items-center gap-2'>
                  <Field
                    type='text'
                    className='text-gray-500 py-2 focus:ring-0 outline-none text-sm border-0 rounded-xl h-[40px]'
                    placeholder='Choose your handle'
                    id='handle'
                    name='handle'
                    required
                  />
                </div>
                <div className='flex items-center'>
                  {values.handle && chainId != NetworkEnum.IEXEC && (
                    <HandlePrice handle={values.handle} />
                  )}
                  <div>
                    <div className='sm:pl-2 sm:pr-4 sm:space-x-4 relative'>
                      <HelpPopover>
                        <h3 className='font-semibold text-white dark:text-white'>
                          What is a TalentLayerID?
                        </h3>
                        <p>
                          AnonID is a work identity that allows ownership and growth of reputation
                          across many gig marketplaces. Anon IDs are ERC-721 NFTs that live inside
                          crypto wallets; this means that reputation is self-custodied by the wallet
                          owner and lives separately from integrated platforms.
                        </p>
                        <h3 className='font-semibold text-white dark:text-white'>
                          What is the handle?
                        </h3>
                        <p>
                          Your Anon ID Handle is a unique string of characters and numbers that you
                          can choose when you create your Anon ID. This handle is how others can
                          search for your reputation. You can have a maximum of 10 characters in
                          your Anon ID.
                        </p>
                        <a
                          target='_blank'
                          href='https://docs.talentlayer.org/basics/elements/what-is-talentlayer-id'
                          className='flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700'>
                          Read more{' '}
                          <svg
                            className='w-4 h-4 ml-1'
                            aria-hidden='true'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                              fillRule='evenodd'
                              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                              clipRule='evenodd'></path>
                          </svg>
                        </a>
                      </HelpPopover>
                    </div>
                  </div>
                </div>
              </div>
              <span className='label-text text-red-500 mt-2'>
                <ErrorMessage name='handle' />
              </span>
              <p className=' bg-trorange'>
                Your Racer ID is your unique tag in the Talent Layer universe. Think of it as your
                handle on the digital raceway – make it catchy, make it clever, make it you.
              </p>
              <div className='flex flex-row gap-4 justify-end items-center mt-4'>
                <SubmitButton isSubmitting={isSubmitting} label='Mint' />
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Formik
        initialValues={initialValuesEmail}
        onSubmit={onSubmitEmail}
        validationSchema={validationSchemaEmail}>
        {({ isSubmitting, values }) => (
          <Form>
            <div className='bg-trblue p-10'>
              <p>Secure Your Inbox on the Track 🚦</p>
              <div className='flex py-4 px-4 mb-2 sm:px-0 items-center flex-row drop-shadow-lg rounded'>
                <div className='sm:px-6 flex flex-row items-center gap-2'>
                  <Field
                    type='text'
                    className='text-gray-500 py-2 focus:ring-0 outline-none text-sm border-0 rounded-xl h-[40px]'
                    placeholder='Type your email address...'
                    id='email'
                    name='email'
                    required
                  />
                </div>
              </div>
              <p className='mb-8'>
                Your email remains private always. With iEXEC's privacy shield, you'll safely
                receive ads and surveys directly, no exposure needed—think of it as your invisible
                inbox.
              </p>
              <p className='mb-8'>
                I consent to receive invites via Talent Layer, keeping my email confidential for:
              </p>
              <div className='container mx-auto mb-8'>
                {options.map((option, index) => {
                  return (
                    <div key={index} className='flex items-center mb-4'>
                      <input
                        type='checkbox'
                        className='form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'
                        id={`optionCheckbox-${index}`}
                        checked={selectedOptions.includes(option)}
                        onChange={() => toggleOption(option)}
                      />
                      <label
                        htmlFor={`optionCheckbox-${index}`}
                        className='ml-2 text-sm text-white-700'>
                        {option}
                      </label>
                    </div>
                  );
                })}
              </div>
              <div className='flex flex-row gap-4 justify-end items-center mt-4'>
                <SubmitButton isSubmitting={isSubmitting} label='Create' />
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Formik
        initialValues={initialValuesInterests}
        onSubmit={onSubmitInterests}
        validationSchema={validationSchemaInterests}>
        {({ isSubmitting, values }) => (
          <Form>
            <div className='bg-white p-10'>
              <p className='mb-4 text-xl text-black'>Set your interests 💨</p>
              <p className='mb-4  text-black'>category: Web3</p>
              <div className='flex flex-wrap gap-2 mb-4'>
                {web3Tags.map((tag, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => toggleTag(tag)}
                      className={`p-2 rounded-full cursor-pointer ${
                        selectedTags.includes(tag)
                          ? '#0048B2 text-white'
                          : 'bg-gray-300 text-gray-700'
                      }`}>
                      {tag}
                    </div>
                  );
                })}
              </div>
              <p className='mb-4  text-black'>category: Networks</p>
              <div className='flex flex-wrap gap-2 mb-4'>
                {networkTags.map((tag, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => toggleTag(tag)}
                      className={`p-2 rounded-full cursor-pointer ${
                        selectedTags.includes(tag)
                          ? '#0048B2 text-white'
                          : 'bg-gray-300 text-gray-700'
                      }`}>
                      {tag}
                    </div>
                  );
                })}
              </div>
              <div className='flex py-4 px-4 mb-2 sm:px-0 justify-center items-center flex-row drop-shadow-lg rounded'>
                <div className='sm:px-6 flex flex-row items-center gap-2'></div>
              </div>
              <div className='flex flex-row gap-4 justify-end items-center mt-4'>
                <SubmitButton isSubmitting={isSubmitting} label='Create' />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TalentLayerIdForm;
