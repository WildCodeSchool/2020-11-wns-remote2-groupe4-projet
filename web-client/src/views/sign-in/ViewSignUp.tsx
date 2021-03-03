import React from 'react';
import { Link } from 'react-router-dom';
import SignUpFormCpnt from '../../components/sign-in-form-cpnt/SignUpFormCpnt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

const ViewSignIn = (): JSX.Element => {
  return (
    <main className="viewSignIn">
      <Link to="/login">
        <FontAwesomeIcon className="v-return" icon={faArrowCircleLeft} />
      </Link>
      <SignUpFormCpnt />
    </main>
  );
};

export default ViewSignIn;
