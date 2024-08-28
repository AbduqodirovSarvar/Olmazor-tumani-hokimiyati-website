export const baseApiUrl = 'http://45.130.148.137:8080/api';
export const baseFileUrl = `${baseApiUrl}/File`
export let Data;

export async function fetchAllData() {
  try {
    const response = await fetch(`${baseApiUrl}/Common`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    Data = await response.json();
    return Data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  } finally {
  }
}
