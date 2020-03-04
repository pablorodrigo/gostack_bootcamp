class DeliveryProblemController {
  async index(request, response) {
    return response.json({ status: 'index text' });
  }

  async store(request, response) {
    return response.json({ status: 'store text' });
  }

  async delete(request, response) {
    return response.json({ status: 'delete text' });
  }
}

export default new DeliveryProblemController();
