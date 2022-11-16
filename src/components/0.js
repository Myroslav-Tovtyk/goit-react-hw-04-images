async componentDidUpdate(_, prevState) {
    const { page, q } = this.state;

    if (prevState.page !== page || prevState.q !== q) {
      this.setState({ isLoading: true });

      try {
        const response = await PixabayPictures(q, page);
        this.setState({ totalHits: response.totalHits });

        if (response.hits.length === 0) {
          return toast.error('No match. Type new query');
        }

        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...response.hits],
        }));
      } catch (error) {
        return toast.error('Something goes wrong...');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }