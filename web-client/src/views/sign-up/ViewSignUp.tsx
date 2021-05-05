import React from 'react';
import { Link } from 'react-router-dom';
import SignUpFormCpnt from '../../components/sign-up-form-cpnt/SignUpFormCpnt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

const ViewSignUp = (): JSX.Element => {
  return (
    <main className="viewSignIn">
      <Link to="/sign-in">
        <FontAwesomeIcon className="v-return" icon={faArrowCircleLeft} />
      </Link>
      <SignUpFormCpnt />
    </main>
  );
};

export default ViewSignUp;
