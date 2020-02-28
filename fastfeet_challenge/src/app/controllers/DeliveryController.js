class DeliveryController {
  async index(request, response) {
    return response.json({ status: 'ok' });
  }

  async store(request, response) {
    return response.json({ status: 'ok' });
  }

  async update(request, response) {
    return response.json({ status: 'ok' });
  }

  async delete(request, response) {
    return response.json({ status: 'ok' });
  }
}

export default new DeliveryController();
