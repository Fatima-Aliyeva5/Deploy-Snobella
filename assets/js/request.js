export const getData = async (url) => {
    try {
      let { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const postData = async (url, obj) => {
    try {
      let { data } = await axios.post(url, obj);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const deleteById = async (url, id) => {
    try {
      let { data } = await axios.delete(`${url}/${id}`);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const putData = async (url, id, obj) => {
    try {
      let { data } = await axios.put(`${url}/${id}`, obj);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const patchData = async (url, id, obj) => {
    try {
      let { data } = await axios.patch(`${url}/${id}`, obj);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  