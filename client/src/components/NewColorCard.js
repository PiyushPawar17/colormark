import styled from 'styled-components';

const NewColorCard = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.6rem;
	color: #5f5f5f;
	text-transform: capitalize;
	border-radius: 5px;
	box-shadow: 0 1rem 5rem rgba(0, 0, 0, 0.2);
	padding: 2rem;
	margin-right: 2%;
	margin-bottom: 10rem;
	flex: 0 1 18%;
	outline: none;
	cursor: pointer;
	animation: moveInBottom 0.3s ease-in-out;
	animation-delay: ${props => props.index / 10}s;
	animation-fill-mode: backwards;

	@media screen and (max-width: 1200px) {
		flex: 0 1 23%;
		margin-right: 2%;
	}

	@media screen and (max-width: 950px) {
		flex: 0 1 31%;
		margin-right: 2%;
	}

	@media screen and (max-width: 700px) {
		flex: 0 1 46%;
		margin-right: 4%;
	}

	@media screen and (max-width: 500px) {
		flex: 0 1 75%;
		margin: 0 auto;
		margin-bottom: 2rem;
	}

	@media screen and (max-width: 375px) {
		flex: 0 1 90%;
	}
`;

export default NewColorCard;
