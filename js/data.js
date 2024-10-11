export const baseApiUrl = 'https://olmazor.api.olmatech.uz/api';
export const baseFileUrl = `${baseApiUrl}/File`
export let Data;
export let EmployeeCategory;
export let PostCategories;

export async function fetchAllData() {
  try {
    const response = await fetch(`${baseApiUrl}/Common`);
    
    const employeeCategory = await fetch(`${baseApiUrl}/Common/enum/employee-categories`);

    const postCategories = await fetch(`${baseApiUrl}/Common/enum/post-categories`);

    if (!response.ok || !employeeCategory.ok || !postCategories.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    Data = await response.json();
    EmployeeCategory = await employeeCategory.json();
    PostCategories = await postCategories.json();
    return Data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  } finally {
  }
}
