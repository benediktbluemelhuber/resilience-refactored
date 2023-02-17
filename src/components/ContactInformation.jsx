import React, { useState } from 'react';
import { useRouter } from 'next/router';

const ContactForm = () => {
	const [surname, setSurname] = useState('');
	const [givenName, setGivenName] = useState('');
	const [email, setEmail] = useState('');
	const [interested, setInterested] = useState(false);
	const [notInterested, setNotInterested] = useState(false);
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);

	const router = useRouter();

	const handleSurnameChange = (e) => {
		const value = e.target.value;
		setSurname(e.target.value);
		if (errors.surname && value.trim() !== '') {
			setErrors((prevErrors) => ({ ...prevErrors, surname: '' }));
		}
	};

	const handleGivenNameChange = (e) => {
		const value = e.target.value;
		setGivenName(value);

		// Update errors state to remove error message if input becomes valid
		if (errors.givenName && value.trim() !== '') {
			setErrors((prevErrors) => ({ ...prevErrors, givenName: '' }));
		}
	};

	const handleEmailChange = (e) => {
		const value = e.target.value;
		setEmail(value);

		// Update errors state to remove error message if input becomes valid
		if (errors.email && value.trim() !== '' && /\S+@\S+\.\S+/.test(value)) {
			setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
		}
	};

  const handleInterestedClick = () => {
    setInterested(true);
    setNotInterested(false);
    setErrors((prevErrors) => ({ ...prevErrors, interested: '' }));
  };

  const handleNotInterestedClick = () => {
    setInterested(false);
    setNotInterested(true);
    setErrors((prevErrors) => ({ ...prevErrors, interested: '' }));
  };

	

  const handleSubmit = (e) => {
	e.preventDefault();
	const newErrors = {};
	if (givenName.trim() === '') {
		newErrors.givenName = 'Bitte geben Sie Ihren Vornamen ein.';
	}
	if (surname.trim() === '') {
		newErrors.surname = 'Bitte geben Sie Ihren Nachnamen ein.';
	}
	if (email.trim() === '') {
		newErrors.email = 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
	} else if (!/\S+@\S+\.\S+/.test(email)) {
		newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
	} else {
		localStorage.setItem('email', email); // add email to local storage
		localStorage.setItem('givenName', givenName); // add givenName to local storage
		localStorage.setItem('surname', surname); // add surname to local storage
		localStorage.setItem('interested', interested); // add interested to local storage
	}
	if (!interested && !notInterested) {
		newErrors.interested = 'Bitte wählen Sie eine Option.';
	}
	setErrors(newErrors);

	if (Object.keys(newErrors).length === 0) {
		setSubmitted(true);
	}
};

const handleRedirectClick = () => {
	if (submitted) {
	  router.push({
		pathname: '/DetailedResults',
	  });
	}
  };
  

	return (
		<div className="bg-gray-100 p-6">
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="givenName" className="block font-medium mb-2">
						Vorname
					</label>
					<input
						type="text"
						id="givenName"
						name="givenName"
						className={`w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 ${
							errors.givenName ? 'border-red-500' : ''
						}`}
						value={givenName}
						onChange={handleGivenNameChange}
					/>
					{errors.givenName && (
						<p className="text-red-500 text-sm mt-1">{errors.givenName}</p>
					)}
				</div>
				<div className="mb-4">
					<label htmlFor="surname" className="block font-medium mb-2">
						Nachname
					</label>
					<input
						type="text"
						id="surname"
						name="surname"
						className={`w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 ${
							errors.surname ? 'border-red-500' : ''
						}`}
						value={surname}
						onChange={handleSurnameChange}
					/>
					{errors.surname && (
						<p className="text-red-500 text-sm mt-1">{errors.surname}</p>
					)}
				</div>
				<div className="mb-4">
					<label htmlFor="email" className="block font-medium mb-2">
						E-Mail-Adresse
					</label>
					<input
						type="email"
						id="email"
						name="email"
						className={`w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 ${
							errors.email ? 'border-red-500' : ''
						}`}
						value={email}
						onChange={handleEmailChange}
					/>
					{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
				</div>
				<div className="mb-4">
					<p className="block font-medium mb-2">
						Wir freuen uns darauf, mit Ihnen über die Ergebnisse zu sprechen und
						Optimierungspotentiale zu identifizieren. Interessieren Sie sich für eine
						weitergehende Analyse?
					</p>
					<div className="flex items-center">
						<button
							className={`px-3 py-2 rounded-lg border-2 mr-2 border-gray-200 focus:outline-none ${
								interested ? 'bg-blue-500 text-white' : ''
							}`}
							onClick={handleInterestedClick}
						>
							Ja
						</button>
						<button
							className={`px-3 py-2 rounded-lg border-2 border-gray-200 focus:outline-none ${
								notInterested ? 'bg-blue-500 text-white' : ''
							}`}
							onClick={handleNotInterestedClick}
						>
							Nein
						</button>
					</div>
				</div>
				<div className="text-center">
					<button
						className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
						onClick={handleRedirectClick}
					>
						Absenden & weiter zu den detaillierten Ergebnissen.
					</button>
				</div>
			</form>
		</div>
	);
};

export default ContactForm;
