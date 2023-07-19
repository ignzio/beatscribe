export async function GET(req, res, next) {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:
          'grant_type=client_credentials&client_id=' +
          process.env.SPOTIFY_CLIENT_ID +
          '&client_secret=' +
          process.env.SPOTIFY_CLIENT_SECRET,
      });
      const tokenData = await tokenResponse.json();
      console.log(tokenData);

        const response = await fetch(
            'https://api.spotify.com/v1/browse/new-releases',
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + tokenData.access_token,
                },
            }
        );
        const data = await response.json();

      return new Response(JSON.stringify(data), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    });
}


