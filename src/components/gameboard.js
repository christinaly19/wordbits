export const fetchUrbanDictionaryData = async (word) => {
	const resultString = word.join('');
	const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${resultString}`;
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		return data;
	  } catch (error) {
		throw new Error('Error fetching word definitions:', error);
	  }
  };