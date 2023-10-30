export class GetImages {

  async imgur(albumHash, accessToken) {
    try {
      const response = await fetch(`https://api.imgur.com/3/album/${albumHash}/images`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // 'Access-Control-Allow-Origin': '*'
        }
      });
  
      const { data } = await response.json();
      return data;
      
    } catch (error) { console.error(error) };

  }
  
}