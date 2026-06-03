/**
 * Unwrap standard backend envelope: { success, message, data[], pagination? }
 */
export const unwrapApiResponse = (axiosResponse) => {
  const body = axiosResponse?.data;
  if (body && typeof body.success === 'boolean') {
    return {
      success: body.success,
      message: body.message,
      items: body.data ?? [],
      pagination: body.pagination ?? null,
    };
  }
  return {
    success: true,
    message: '',
    items: body?.data ?? (Array.isArray(body) ? body : body ? [body] : []),
    pagination: body?.pagination ?? null,
  };
};

export const mapListResponse = (axiosResponse) => {
  const { items, pagination } = unwrapApiResponse(axiosResponse);
  return {
    data: items,
    total: pagination?.total ?? items.length,
    page: pagination?.page ?? 1,
    limit: pagination?.limit ?? items.length,
  };
};
