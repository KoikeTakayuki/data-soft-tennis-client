import React from 'react';
import GoogleAd from 'react-google-ad'

class ResponsiveBanner extends React.Component {

  render() {

    const add = '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><!-- data-soft-tennis-responsive --><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3870168803881977" data-ad-slot="2556469648" data-ad-format="auto"></ins> <script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>';

    return (
      <div dangerouslySetInnerHTML={{__html: add}}>
        <GoogleAd client="ca-pub-3870168803881977" slot="2556469648" format="auto" />
      </div>
    );
  }
}